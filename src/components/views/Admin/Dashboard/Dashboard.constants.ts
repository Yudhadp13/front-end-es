// src/components/views/Admin/Dashboard/Dashboard.constants.ts

import {
  CiBoxes,
  CiViewList,
  CiBookmark,
  CiSettings,
  CiFileOn,
  CiImageOn,
} from "react-icons/ci";

export const DASHBOARD_CARDS = [
  {
    key: "category",
    label: "Category",
    description: "Total kategori material",
    icon: CiBoxes,
    color: "bg-blue-50 text-blue-700",
  },
  {
    key: "specification",
    label: "Specification",
    description: "Karakteristik material",
    icon: CiSettings,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    key: "material",
    label: "Material",
    description: "Data material cetak",
    icon: CiFileOn,
    color: "bg-purple-50 text-purple-700",
  },
  {
    key: "rule",
    label: "Rule",
    description: "Aturan expert system",
    icon: CiViewList,
    color: "bg-orange-50 text-orange-700",
  },
  {
    key: "question",
    label: "Question",
    description: "Pertanyaan konsultasi",
    icon: CiBookmark,
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    key: "banner",
    label: "Banner",
    description: "Banner promosi",
    icon: CiImageOn,
    color: "bg-pink-50 text-pink-700",
  },
];
