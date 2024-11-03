import { redirect } from "next/navigation";
type Props = {
  params: {
    form_type: string;
  };
};

const page = ({ params }: Props) => {
  const { form_type } = params;

  redirect(`/${form_type}/components/form`);
};

export default page;
