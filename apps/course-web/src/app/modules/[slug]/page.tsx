import { redirect } from "next/navigation";

export default async function LegacyModuleRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/courses/ai-engineer-guide/modules/${slug}`);
}
