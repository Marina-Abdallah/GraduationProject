import React, { createContext, useContext, useState, useCallback } from "react";

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
  name: "Marina Abdallah",
  email: "mrmr.abdallah.gerges@gmail.com",
  phone: "+20 109 104 3336",
  birthdate: "21 March 2004",
  bio: "I am a dedicated student majoring in Software Industry & Multimedia, specializing in .NET Core development, database management, APIs, and Razor Pages, with a strong passion for learning and building innovative solutions. Expected to graduate in 2026, I enjoy tackling technical challenges and turning ideas into functional prototypes. Currently, I am expanding my knowledge in back-end development using .NET while refining my skills in user-centric design, cybersecurity, and software development.",
  headline: "UI/UX Designer",
  major: "Software Industry and Multimedia",
  photo: null,
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

const DEFAULT_SKILLS = ["APIs", "UI/UX", "SQL", "Entity Framework Core", "HTML", "ADO.NET", "MVC", "C#", "C++"];

export function AppProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [company, setCompany] = useState(DEFAULT_COMPANY);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [userSavedPostIds, setUserSavedPostIds] = useState(new Set());
  const [companySavedPostIds, setCompanySavedPostIds] = useState(new Set());

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);
  const updateCompany = useCallback((updates) => {
    setCompany((prev) => ({ ...prev, ...updates }));
  }, []);

  const addSkill = useCallback(
    (skill) => {
      const trimmed = skill?.trim();
      if (trimmed && !skills.includes(trimmed)) {
        setSkills((prev) => [...prev, trimmed]);
      }
    },
    [skills]
  );

  const removeSkill = useCallback((skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
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
