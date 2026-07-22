import { notFound, redirect } from "next/navigation";
import { getCourseModuleForStudy } from "@/server/courses/course-service";

export const dynamic = "force-dynamic";

// Lectures are read on the module page. This route only exists so old lecture
// links, bookmarks, and continue-learning URLs keep working: it forwards to the
// module reading surface, scrolled to the lecture's heading.
export default async function LectureRedirectPage({ params }: { params: Promise<{ courseSlug: string; moduleSlug: string; lectureId: string }> }) {
  const { courseSlug, moduleSlug, lectureId } = await params;
  const result = await getCourseModuleForStudy(courseSlug, moduleSlug);

  if (!result) {
    notFound();
  }

  const lecture = result.module.lectures.find((item) => item.id === lectureId);
  const modulePath = `/courses/${courseSlug}/modules/${moduleSlug}`;

  redirect(lecture?.anchor ? `${modulePath}#${lecture.anchor}` : modulePath);
}
