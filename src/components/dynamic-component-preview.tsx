"use client";

import dynamic from "next/dynamic";

const DynamicComponentPreview = ({ componentPath = "" }) => {
  const DynamicComponent = dynamic(
    () => import(`@/components/ui/${componentPath}`)
  );

  return <DynamicComponent />;
};

export default DynamicComponentPreview;
