// src/components/views/Admin/Dashboard/useDashboard.tsx

import { useQuery } from "@tanstack/react-query";
import categoryServices from "@/services/category.service";
import specificationServices from "@/services/specification.service";
import materialServices from "@/services/material.service";
import ruleServices from "@/services/rule.service";
import questionServices from "@/services/question.service";
import bannerServices from "@/services/banner.service";

const useDashboard = () => {
  const { data: category } = useQuery({
    queryKey: ["DashboardCategory"],
    queryFn: () => categoryServices.getCategories(),
  });

  const { data: specification } = useQuery({
    queryKey: ["DashboardSpecification"],
    queryFn: () => specificationServices.getSpecifications(),
  });

  const { data: material } = useQuery({
    queryKey: ["DashboardMaterial"],
    queryFn: () => materialServices.getMaterials("limit=1"),
  });

  const { data: rule } = useQuery({
    queryKey: ["DashboardRule"],
    queryFn: () => ruleServices.getRules(),
  });

  const { data: question } = useQuery({
    queryKey: ["DashboardQuestion"],
    queryFn: () => questionServices.getQuestions(),
  });

  const { data: banner } = useQuery({
    queryKey: ["DashboardBanner"],
    queryFn: () => bannerServices.getBanners(),
  });

  return {
    totals: {
      category: category?.data?.data?.length || 0,
      specification: specification?.data?.data?.length || 0,
      material: material?.data?.pagination?.total || 0,
      rule: rule?.data?.data?.length || 0,
      question: question?.data?.data?.length || 0,
      banner: banner?.data?.data?.length || 0,
    },
  };
};

export default useDashboard;
