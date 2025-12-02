import {
  MdQuestionAnswer,
} from "react-icons/md";

import { 
    TbBrandDatabricks 
} from "react-icons/tb";

import { 
    FaBookmark,
    FaBusinessTime, 
    FaClipboardList, 
    FaDna, 
    FaObjectGroup, 
    FaPuzzlePiece, 
    FaReceipt, 
    FaUser, 
    FaWindowRestore 
} from "react-icons/fa6";

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <FaObjectGroup  />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: <FaReceipt  />,
  },
  {
    key: "material",
    label: "Material",
    href: "/admin/material",
    icon: <TbBrandDatabricks />,
  },
  {
    key: "specification",
    label: "Specification",
    href: "/admin/specification",
    icon: <FaDna  />,
  },
  {
    key: "question",
    label: "Question",
    href: "/admin/question",
    icon: <MdQuestionAnswer />,
  },
  {
    key: "rule",
    label: "Rule",
    href: "/admin/rule",
    icon: <FaPuzzlePiece />,
  },
  {
    key: "consultation-all",
    label: "All Consultations",
    href: "/admin/consultation",
    icon: <FaWindowRestore  />,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banner",
    icon: <FaBookmark />,
  },
];

const SIDEBAR_MEMBER = [
    {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <FaObjectGroup  />,
  },
  {
    key: "consultation",
    label: "Consultation",
    href: "/member/consultation",
    icon: <FaClipboardList  />,
  },
  {
    key: "consultation-history",
    label: "History",
    href: "/member/history",
    icon: <FaBusinessTime  />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/member/profile",
    icon: <FaUser />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
