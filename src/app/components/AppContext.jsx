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
  name: "Microsoft",
  email: "[EMAIL_ADDRESS]",
  overview: "Every company has a mission. What's ours? To empower every person and every organization to achieve more. We believe technology can and should be a force for good and that meaningful innovation contributes to a brighter world in the future and today. Our culture doesn’t just encourage curiosity; it embraces it. Each day we make progress together by showing up as our authentic selves. We show up with a learn-it-all mentality. We show up cheering on others, knowing their success doesn't diminish our own. We show up every day open to learning our own biases, changing our behavior, and inviting in differences. Because impact matters.  Microsoft operates in 190 countries and is made up of approximately 228,000 passionate employees worldwide.",
  industry: "Software Industry",
  website: "www.microsoft.com",
  address: "Cairo, Egypt",
  phone: "+20 109 104 3336",
  photo: null,
};

const DEFAULT_SKILLS = [];

export function AppProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [company, setCompany] = useState(DEFAULT_COMPANY);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [userSavedPostIds, setUserSavedPostIds] = useState(new Set());
  const [companySavedPostIds, setCompanySavedPostIds] = useState(new Set());

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get("/Users/me/profile", {
          headers: {
            Authorization: `Bearer ${token}`
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
          resumeFileName: data.cvUrl,
        }));

      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchSkillsData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get("/Users/skills", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (Array.isArray(response.data)) {
          const formattedSkills = response.data.map(skill => {
            if (typeof skill === 'string') return { id: skill, name: skill };
            return { id: skill.id || skill.skillId || skill.name, name: skill.name || skill.skillName || "Unknown Skill" };
          });
          setSkills(formattedSkills);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchProfileData();
    fetchSkillsData();
  }, []);

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
      if (updates.resumeFileName !== undefined) dto.cvUrl = updates.resumeFileName;
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
        }));
      }
    } catch (err) {
      console.error("Failed to update profile on backend", err);
    }
  }, []);
  const updateCompany = useCallback((updates) => {
    setCompany((prev) => ({ ...prev, ...updates }));
  }, []);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
