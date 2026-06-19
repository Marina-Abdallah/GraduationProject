import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../../api/axios";
import defaultPhoto from "../../assets/defaultImg.png";

export const COMMUNITY_POSTS_DATA = {
  post1: {
    id: "post1",
    author: "Marina Abdallah",
    role: "UI/UX Designer",
    content: "Can anyone help me with the new feature in Figma?",
    likes: 16,
  },
  post2: {
    id: "post2",
    author: "Ahmed Mamdouh",
    role: "Staff Software Engineer",
    content:
      'شركه كانت مكلماني علشان اعمل Interviews لمتقدمين علشان كانت محتاجه "Senior" في ال Team بتاعها لان مفيش حد فاضي عندهم في الشركه، فوافقت.',
    likes: 24,
  },
  post3: {
    id: "post3",
    author: "Sara Hassan",
    role: "Product Manager",
    content: "Looking for talented developers to join our growing team! Great opportunity for backend engineers.",
    likes: 31,
  },
};

const AppContext = createContext(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

const DEFAULT_PROFILE = {
  name: "[FIRSTNAME]+[LASTNAME]",
  email: "[EMAIL_ADDRESS]",
  phone: "[PHONE_NUMBER]",
  birthdate: "[BIRTHDATE]",
  bio: "[BIO]",
  headline: "[HEADLINE]",
  major: "[MAJOR]",
  photo: defaultPhoto,
  resumeFileName: "",
  resumeScore: 0,
};
const DEFAULT_COMPANY = {
  name: "[COMPANY_NAME]",
  email: "[EMAIL_ADDRESS]",
  overview: "[OVERVIEW]",
  industry: "[INDUSTRY]",
  industryId: "",
  website: "[WEBSITE]",
  address: "[ADDRESS]",
  phone: "[PHONE_NUMBER]",
  photo: defaultPhoto,
};

const DEFAULT_SKILLS = [];

export function AppProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [company, setCompany] = useState(DEFAULT_COMPANY);
  const [industries, setIndustries] = useState([]);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [userSavedPostIds, setUserSavedPostIds] = useState(new Set());
  const [companySavedPostIds, setCompanySavedPostIds] = useState(new Set());
  const [authToken, setAuthTokenState] = useState(() => localStorage.getItem("token"));

  const setAuthToken = useCallback((token) => {
    setAuthTokenState(token);

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!authToken) return;

        const response = await api.get("/Users/me/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        const data = response.data;

        const photoUrl = data.pictureUrl
          ? `https://localhost:7292${data.pictureUrl}`
          : defaultPhoto;

        setProfile((prev) => ({
          ...prev,
          name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : (data.firstName || ""),
          email: data.email,
          phone: data.phone,
          birthdate: data.birthdate,
          bio: data.bio,
          headline: data.headline,
          major: data.major,
          photo: photoUrl || defaultPhoto,
          resumeFileName: data.cvName ?? "",
          resumeScore: data.cvScore ?? 0,
        }));
      } catch (error) {
        // Suppress 404 errors - user may not exist or API may be unavailable
        if (error.response?.status !== 404 && error.code !== 'ERR_NETWORK') {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    const fetchCompanyData = async () => {
      try {
        if (!authToken) return;

        const response = await api.get("/Companies/me/overview", {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        const data = response.data;

        const photoUrl = data.pictureUrl
          ? `https://localhost:7292${data.pictureUrl}`
          : defaultPhoto;

        setCompany((prev) => ({
          ...prev,
          name: data.name ?? prev.name,
          email: data.email ?? prev.email,
          overview: data.overview ?? prev.overview,
          industry: data.industryName ?? data.industry ?? prev.industry,
          industryId: data.industryId ?? prev.industryId,
          website: data.websiteUrl ?? data.website ?? prev.website,
          address: data.address ?? prev.address,
          phone: data.phone ?? prev.phone,
          photo: photoUrl,
        }));
      } catch (error) {
        // Suppress 404 errors (user may not be a company) and network errors
        if (error.response?.status !== 404 && error.code !== 'ERR_NETWORK') {
          console.error("Error fetching company data:", error);
        }
      }
    };

    const fetchIndustriesData = async () => {
      try {
        const headers = authToken ? { Authorization: `Bearer ${authToken}` } : undefined;

        const requestIndustryList = async (url) => {
          const resp = await api.get(url, { headers });
          return resp.data;
        };

        let data = null;
        try {
          data = await requestIndustryList("/Companies/industries");
        } catch (err) {
          if (err.response?.status === 404) {
            data = await requestIndustryList("/Industries");
          } else {
            throw err;
          }
        }

        if (Array.isArray(data)) {
          const normalized = data.map((item) => ({
            id: item.id ?? item.industryId ?? item.value ?? item.label ?? item.name,
            name: item.name ?? item.label ?? item.industryName ?? item.value ?? item,
          }));
          setIndustries(normalized.filter((item) => item.id !== undefined));
        }
      } catch (error) {
        // Suppress network errors - API may be unavailable
        if (error.code !== 'ERR_NETWORK') {
          console.error("Error fetching industries:", error);
        }
      }
    };

    const fetchSkillsData = async () => {
      try {
        if (!authToken) return;

        const response = await api.get("/Users/me/skills", {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        const rawSkills = Array.isArray(response.data)
          ? response.data
          : response.data?.skills || response.data?.items || response.data?.data || [];

        if (Array.isArray(rawSkills)) {
          const formattedSkills = rawSkills.map((skill) => {
            if (typeof skill === "string") return { id: skill, name: skill };

            return {
              id: skill.id || skill.skillId || skill.name,
              name: skill.name || skill.skillName || "Unknown Skill",
            };
          });

          setSkills(formattedSkills);
        }
      } catch (error) {
        // Suppress network errors - API may be unavailable
        if (error.code !== 'ERR_NETWORK') {
          console.error("Error fetching skills:", error);
        }
      }
    };

    fetchProfileData();
    fetchCompanyData();
    fetchIndustriesData();
    fetchSkillsData();
  }, [authToken]);

  const uploadPhoto = async (file) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const formData = new FormData();
      formData.append("photo", file);

      const response = await api.post(
        "/Users/me/profile/photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.pictureUrl || response.data.PictureUrl;
    } catch (err) {
      console.error("Photo upload failed:", err);
      return null;
    }
  };

  const updateProfile = useCallback(async (updates) => {
    // Optimistically update the UI state
    setProfile((prev) => ({ ...prev, ...updates }));

    // Send the partial update to the backend
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Upload photo if file exists
      if (updates.photoFile) {
        const savedPhotoUrl = await uploadPhoto(updates.photoFile);

        if (savedPhotoUrl) {
          updates.photo = `https://localhost:7292${savedPhotoUrl}`;
        }
      }

      const dto = {};

      if (updates.bio !== undefined) dto.bio = updates.bio;
      if (updates.headline !== undefined) dto.headline = updates.headline;
      if (updates.major !== undefined) dto.major = updates.major;
      if (updates.university !== undefined) dto.university = updates.university;
      if (updates.resumeFileName !== undefined) dto.cvName = updates.resumeFileName;
      // NOTE: resumeScore is NOT in UpdateProfileDto — it is persisted by POST /cv/score/{userId}.
      // We do NOT send it in the PATCH to avoid backend rejection.
      if (updates.phone !== undefined) dto.phone = updates.phone;
      if (updates.birthdate !== undefined) dto.birthdate = updates.birthdate;
      if (updates.address !== undefined) dto.address = updates.address;
      if (updates.email !== undefined) dto.email = updates.email;

      if (updates.name !== undefined) {
        const parts = updates.name.trim().split(" ");
        dto.firstName = parts[0] || "";
        dto.lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";
      }

      // Send a PATCH request with the updated fields
      const response = await api.patch("/Users/me/profile", dto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // If the backend returns the updated profile object, sync the state with it
      if (response.data && typeof response.data === 'object' && response.data.firstName !== undefined) {
        const data = response.data;
        setProfile((prev) => ({
          ...prev,
          name: data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : (data.firstName || prev.name),
          email: data.email ?? prev.email,
          phone: data.phone ?? prev.phone,
          birthdate: data.birthdate ?? prev.birthdate,
          bio: data.bio ?? prev.bio,
          headline: data.headline ?? prev.headline,
          major: data.major ?? prev.major,
          photo: data.pictureUrl
            ? `https://localhost:7292${data.pictureUrl}`
            : prev.photo,
          resumeFileName: data.cvUrl ?? prev.resumeFileName,
          resumeScore: data.resumeScore ?? prev.resumeScore,
        }));
      }
    } catch (err) {
      console.error("Failed to update profile on backend", err);
    }
  }, []);
  const updateCompany = useCallback(async (updates) => {
    const previousCompany = company;
    setCompany((prev) => ({ ...prev, ...updates }));

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const dto = {};
      if (updates.name !== undefined) dto.name = updates.name;
      if (updates.email !== undefined) dto.email = updates.email;
      if (updates.overview !== undefined) dto.overview = updates.overview;
      if (updates.industryId !== undefined) dto.industryId = updates.industryId;
      if (updates.website !== undefined) dto.websiteUrl = updates.website;
      if (updates.address !== undefined) dto.address = updates.address;
      if (updates.phone !== undefined) dto.phone = updates.phone;

      const response = await api.patch("/Companies/me/overview", dto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data && typeof data === "object") {
        setCompany((prev) => ({
          ...prev,
          name: data.name ?? prev.name,
          email: data.email ?? prev.email,
          overview: data.overview ?? prev.overview,
          industry: data.industryName ?? data.industry ?? prev.industry,
          industryId: data.industryId ?? prev.industryId,
          website: data.websiteUrl ?? data.website ?? prev.website,
          address: data.address ?? prev.address,
          phone: data.phone ?? prev.phone,
          photo: data.pictureUrl
            ? `https://localhost:7292${data.pictureUrl}`
            : prev.photo,
        }));
      }
    } catch (err) {
      console.error("Failed to update company on backend", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        request: err.request,
        config: err.config,
      });
      setCompany(previousCompany);
    }
  }, [company]);

  const addSkill = useCallback(
    (skillObj) => {
      if (typeof skillObj === 'string') {
        const trimmed = skillObj.trim();
        if (trimmed && !skills.find(s => s === trimmed || s.name === trimmed)) {
          setSkills((prev) => [...prev, { id: trimmed, name: trimmed }]);
        }
      } else if (skillObj && skillObj.id) {
        if (!skills.find(s => s.id === skillObj.id)) {
          setSkills((prev) => [...prev, skillObj]);
        }
      }
    },
    [skills]
  );

  const setSkillsList = useCallback((newSkills) => {
    setSkills(newSkills);
  }, []);

  const removeSkill = useCallback((skillId) => {
    setSkills((prev) => prev.filter((s) => {
      if (typeof s === 'object') return s.id !== skillId;
      return s !== skillId;
    }));
  }, []);

  const toggleUserSavedPost = useCallback((postId) => {
    setUserSavedPostIds((prev) => {
      const next = new Set(prev);

      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }

      return next;
    });
  }, []);

  const toggleCompanySavedPost = useCallback((postId) => {
    setCompanySavedPostIds((prev) => {
      const next = new Set(prev);

      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }

      return next;
    });
  }, []);

  const userSavedPosts = Array.from(userSavedPostIds)
    .map((id) => COMMUNITY_POSTS_DATA[id])
    .filter(Boolean);

  const companySavedPosts = Array.from(companySavedPostIds)
    .map((id) => COMMUNITY_POSTS_DATA[id])
    .filter(Boolean);

  return (
    <AppContext.Provider
      value={{
        profile,
        company,
        industries,
        updateProfile,
        updateCompany,
        skills,
        addSkill,
        removeSkill,
        setSkillsList,
        userSavedPostIds,
        companySavedPostIds,
        userSavedPosts,
        companySavedPosts,
        toggleUserSavedPost,
        toggleCompanySavedPost,
        setAuthToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
