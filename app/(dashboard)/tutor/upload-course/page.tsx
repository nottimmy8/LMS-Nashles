"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  GripVertical,
  Upload,
  Save,
  Eye,
  CheckCircle,
  Video,
  FileText,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { courseService } from "@/services/course.service";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getFileUrl } from "@/lib/utils";

const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  videoUrl: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
});

const chapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  lessons: z.array(lessonSchema),
});

// Full validation schema for publishing
const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subtitle: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  level: z.string().min(1, "Level is required"),
  language: z.string().min(1, "Language is required"),
  price: z.string().min(1, "Price is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  chapters: z.array(chapterSchema),
});

// Relaxed schema for drafts - only title is truly required
const draftSchema = z.object({
  title: z.string().min(1, "Title is required to save a draft"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  language: z.string().optional(),
  price: z.string().optional(),
  thumbnail: z.string().optional(),
  chapters: z.array(chapterSchema).optional(),
});

type Lesson = z.infer<typeof lessonSchema>;
type Chapter = z.infer<typeof chapterSchema>;
type CourseFormData = z.infer<typeof courseSchema>;

const UploadCourseContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [pendingFiles, setPendingFiles] = useState<{
    [key: string]: File;
  }>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      category: "",
      level: "",
      language: "",
      price: "",
      thumbnail: "",
      chapters: [],
    },
  });

  const formData = watch();

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "",
      lessons: [],
    },
  ]);

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const course = await courseService.getCourseById(courseId);
          const sanitizedChapters = (course.chapters || []).map((ch: any) => ({
            id: ch.id || ch._id || Date.now().toString(),
            title: ch.title || "",
            lessons: (ch.lessons || []).map((l: any) => ({
              id: l.id || l._id || Date.now().toString(),
              title: l.title || "",
              videoUrl: l.videoUrl || "",
              duration: l.duration || "",
              description: l.description || "",
            })),
          }));

          reset({
            title: course.title || "",
            subtitle: course.subtitle || "",
            description: course.description || "",
            level: course.level || "",
            language: course.language || "",
            price: course.price?.toString() || "",
            thumbnail: course.thumbnail || "",
            chapters: sanitizedChapters,
          });

          if (sanitizedChapters.length > 0) {
            setChapters(sanitizedChapters);
          }
        } catch (error) {
          console.error("Error fetching course for edit:", error);
        }
      };
      fetchCourse();
    }
  }, [courseId, reset]);

  const simulateUpload = async (file: File, key: string) => {
    const isImage = file.type.startsWith("image/");
    const maxSize = isImage ? 2 * 1024 * 1024 : 100 * 1024 * 1024; // 2MB image, 100MB video

    if (file.size > maxSize) {
      alert(`File size too large. Max ${isImage ? "2MB" : "100MB"} allowed.`);
      return;
    }

    // Store the file for actual upload later
    setPendingFiles((prev) => ({ ...prev, [key]: file }));

    // UI Feedback: Show 100% immediately or simulate quick progress
    setUploadProgress((prev) => ({ ...prev, [key]: 100 }));

    const localUrl = URL.createObjectURL(file);

    if (key === "thumbnail") {
      setValue("thumbnail", localUrl);
    } else {
      return localUrl;
    }
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: "",
      lessons: [],
    };
    setChapters([...chapters, newChapter]);
  };

  const removeChapter = (chapterId: string) => {
    setChapters(chapters.filter((ch) => ch.id !== chapterId));
  };

  const addLesson = (chapterId: string) => {
    setChapters(
      chapters.map((ch) =>
        ch.id === chapterId
          ? {
              ...ch,
              lessons: [
                ...ch.lessons,
                {
                  id: Date.now().toString(),
                  title: "",
                  videoUrl: "",
                  duration: "",
                  description: "",
                },
              ],
            }
          : ch,
      ),
    );
  };

  const removeLesson = (chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((ch) =>
        ch.id === chapterId
          ? {
              ...ch,
              lessons: ch.lessons.filter((lesson) => lesson.id !== lessonId),
            }
          : ch,
      ),
    );
  };

  const updateChapterTitle = (chapterId: string, title: string) => {
    setChapters(
      chapters.map((ch) => (ch.id === chapterId ? { ...ch, title } : ch)),
    );
  };

  const updateLessonTitle = (
    chapterId: string,
    lessonId: string,
    title: string,
  ) => {
    setChapters(
      chapters.map((ch) =>
        ch.id === chapterId
          ? {
              ...ch,
              lessons: ch.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, title } : lesson,
              ),
            }
          : ch,
      ),
    );
  };

  const updateLessonVideo = async (
    chapterId: string,
    lessonId: string,
    file: File,
  ) => {
    const videoUrl = await simulateUpload(file, `video-${lessonId}`);
    if (videoUrl) {
      setChapters(
        chapters.map((ch) =>
          ch.id === chapterId
            ? {
                ...ch,
                lessons: ch.lessons.map((lesson) =>
                  lesson.id === lessonId ? { ...lesson, videoUrl } : lesson,
                ),
              }
            : ch,
        ),
      );
    }
  };

  const handleCourseSubmit = async (
    data: CourseFormData,
    status: "draft" | "published",
  ) => {
    // 1. Validation for published status
    if (status === "published") {
      if (chapters.length < 2) {
        alert("A published course must have at least 2 chapters.");
        return;
      }
      const hasEmptyChapters = chapters.some(
        (ch) => !ch.title || ch.lessons.length === 0,
      );
      if (hasEmptyChapters) {
        alert(
          "All chapters must have a title and at least one lesson before publishing.",
        );
        return;
      }
    }

    // 2. Data Cleaning
    const cleanedChapters = chapters.map((ch) => ({
      id: ch.id,
      title: ch.title || "Untitled Chapter",
      lessons: ch.lessons.map((l) => ({
        id: l.id,
        title: l.title || "Untitled Lesson",
        // videoUrl: l.videoUrl || "",
        videoUrl: l.videoUrl?.startsWith("blob:") ? "" : l.videoUrl,
        duration: l.duration || "",
        description: l.description || "",
      })),
    }));

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();

      const payload = {
        ...data,
        price: parseFloat(data.price) || 0,
        chapters: cleanedChapters,
        status,
      };

      // Append data as stringified JSON
      formDataToSend.append("courseData", JSON.stringify(payload));

      // Append files
      Object.entries(pendingFiles).forEach(([key, file]) => {
        formDataToSend.append(key, file);
      });

      if (status === "draft") {
        await courseService.saveDraft(formDataToSend, courseId || undefined);
      } else {
        await courseService.publishCourse(
          formDataToSend,
          courseId || undefined,
        );
      }

      alert(
        `Course ${status === "draft" ? "saved as draft" : "published"} successfully!`,
      );
      router.push("/tutor/my-courses");
    } catch (error: any) {
      console.error(
        `Error ${status === "draft" ? "saving draft" : "publishing course"}:`,
        error,
      );
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred";
      alert(
        `Failed to ${status === "draft" ? "save draft" : "publish course"}: ${errorMessage}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync chapters state with form data
  useEffect(() => {
    setValue("chapters", chapters);
  }, [chapters, setValue]);

  const saveDraft = () => {
    // Validate with draft schema (only title required)
    const currentFormData = getValues(); // use getValues for latest state
    const draftValidation = draftSchema.safeParse({
      ...currentFormData,
      chapters,
    }); // Explicitly use chapters state
    if (!draftValidation.success) {
      // Safely access the first error message
      const errorObject = (draftValidation as any).error;
      const firstError = errorObject?.errors?.[0];
      const errorMessage =
        firstError?.message ||
        "Please provide at least a course title to save as draft.";

      alert(errorMessage);
      console.error("Draft validation failed:", errorObject);
      return;
    }
    handleCourseSubmit(formData, "draft");
  };

  const publishCourse = () => {
    handleSubmit((data) => handleCourseSubmit(data, "published"))();
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              step >= stepNum
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
          </div>
          <span
            className={`text-sm font-medium ${step >= stepNum ? "text-primary" : "text-gray-500"}`}
          >
            {stepNum === 1 && "Basic Info"}
            {stepNum === 2 && "Curriculum"}
            {stepNum === 3 && "Preview"}
          </span>
          {stepNum < 3 && (
            <div
              className={`w-16 h-1 ${step > stepNum ? "bg-primary" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Course Basic Information</h2>
        <p className="text-gray-500">
          Fill in the essential details about your course
        </p>
      </div>

      <FieldGroup>
        <Label className="flex justify-between">
          Course Title *
          {errors.title && (
            <span className="text-red-500 text-xs font-normal">
              {errors.title.message}
            </span>
          )}
        </Label>
        <Field>
          <input
            type="text"
            placeholder="e.g., Complete Web Development Bootcamp"
            {...register("title")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.title ? "border-red-500" : "border-gray-300"}`}
          />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Label>Course Subtitle</Label>
        <Field>
          <input
            type="text"
            placeholder="e.g., Learn HTML, CSS, JavaScript, React and more"
            {...register("subtitle")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Label className="flex justify-between">
          Course Description *
          {errors.description && (
            <span className="text-red-500 text-xs font-normal">
              {errors.description.message}
            </span>
          )}
        </Label>
        <Field>
          <textarea
            placeholder="Describe what students will learn in this course..."
            {...register("description")}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
        </Field>
      </FieldGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FieldGroup>
          <Label>Category *</Label>
          <Select
            value={formData.category ?? ""}
            onValueChange={(value) =>
              setValue("category", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="web-development" value="web-development">
                Web Development
              </SelectItem>
              <SelectItem key="mobile-development" value="mobile-development">
                Mobile Development
              </SelectItem>
              <SelectItem key="data-science" value="data-science">
                Data Science
              </SelectItem>
              <SelectItem key="design" value="design">
                Design
              </SelectItem>
              <SelectItem key="business" value="business">
                Business
              </SelectItem>
              <SelectItem key="marketing" value="marketing">
                Marketing
              </SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>Level *</Label>
          <Select
            value={formData.level ?? ""}
            onValueChange={(value) =>
              setValue("level", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="beginner" value="beginner">
                Beginner
              </SelectItem>
              <SelectItem key="intermediate" value="intermediate">
                Intermediate
              </SelectItem>
              <SelectItem key="advanced" value="advanced">
                Advanced
              </SelectItem>
              <SelectItem key="all-levels" value="all-levels">
                All Levels
              </SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>Language *</Label>
          <Select
            value={formData.language ?? ""}
            onValueChange={(value) =>
              setValue("language", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="english" value="english">
                English
              </SelectItem>
              <SelectItem key="spanish" value="spanish">
                Spanish
              </SelectItem>
              <SelectItem key="french" value="french">
                French
              </SelectItem>
              <SelectItem key="german" value="german">
                German
              </SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label className="flex justify-between">
            Price (USD) *
            {errors.price && (
              <span className="text-red-500 text-xs font-normal">
                {errors.price.message}
              </span>
            )}
          </Label>
          <Field>
            <input
              type="number"
              placeholder="49.99"
              {...register("price")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.price ? "border-red-500" : "border-gray-300"}`}
            />
          </Field>
        </FieldGroup>
      </div>

      <FieldGroup>
        <Label className="flex justify-between">
          Course Thumbnail *
          {errors.thumbnail && (
            <span className="text-red-500 text-xs font-normal">
              {errors.thumbnail.message}
            </span>
          )}
        </Label>
        <div
          onClick={() => document.getElementById("thumbnail-upload")?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative overflow-hidden ${errors.thumbnail ? "border-red-500 bg-red-50/10" : "border-gray-300"}`}
        >
          {formData.thumbnail ? (
            <div className="relative h-40 w-full group">
              <img
                src={getFileUrl(formData.thumbnail) ?? "/placeholder.png"}
                alt="Thumbnail preview"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="text-white w-8 h-8" />
              </div>
            </div>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG or WEBP (max: 2MB)
              </p>
            </>
          )}

          {uploadProgress["thumbnail"] !== undefined &&
            uploadProgress["thumbnail"] < 100 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress["thumbnail"]}%` }}
                />
              </div>
            )}

          <input
            id="thumbnail-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) simulateUpload(file, "thumbnail");
            }}
          />
        </div>
      </FieldGroup>
    </div>
  );

  const renderCurriculum = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Build Your Curriculum</h2>
          <p className="text-gray-500">
            Organize your course content into chapters and lessons
          </p>
        </div>
        <Button onClick={addChapter} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Chapter
        </Button>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter, chapterIndex) => (
          <Card key={chapter.id} className="p-6">
            <div className="flex items-start gap-4">
              <GripVertical className="w-5 h-5 text-gray-400 mt-3 cursor-move" />
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <FieldGroup className="flex-1">
                    <input
                      type="text"
                      placeholder={`Chapter ${chapterIndex + 1}: Enter chapter title`}
                      value={chapter.title}
                      onChange={(e) =>
                        updateChapterTitle(chapter.id, e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-semibold"
                    />
                  </FieldGroup>
                  <Button
                    variant="outline"
                    onClick={() => removeChapter(chapter.id)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="ml-6 space-y-3">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col gap-3 bg-gray-50 p-4 rounded-lg relative overflow-hidden"
                    >
                      <div className="flex items-center gap-3">
                        <Video className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder={`Lesson ${lessonIndex + 1}: Enter lesson title`}
                          value={lesson.title}
                          onChange={(e) =>
                            updateLessonTitle(
                              chapter.id,
                              lesson.id,
                              e.target.value,
                            )
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document
                              .getElementById(`video-upload-${lesson.id}`)
                              ?.click()
                          }
                          className={`gap-2 bg-white ${lesson.videoUrl ? "text-green-600 border-green-200" : ""}`}
                        >
                          {lesson.videoUrl ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          {lesson.videoUrl ? "Change Video" : "Upload Video"}
                        </Button>
                        <input
                          id={`video-upload-${lesson.id}`}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file)
                              updateLessonVideo(chapter.id, lesson.id, file);
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeLesson(chapter.id, lesson.id)}
                          className="text-red-500 hover:bg-red-50 bg-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {uploadProgress[`video-${lesson.id}`] !== undefined &&
                        uploadProgress[`video-${lesson.id}`] < 100 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                            <div
                              className="h-full bg-primary transition-all duration-300"
                              style={{
                                width: `${uploadProgress[`video-${lesson.id}`]}%`,
                              }}
                            />
                          </div>
                        )}

                      {lesson.videoUrl && (
                        <p className="text-[10px] text-green-600 flex items-center gap-1 ml-7">
                          <CheckCircle className="w-3 h-3" />
                          Video ready:{" "}
                          <span className="truncate max-w-[200px]">
                            {lesson.videoUrl}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addLesson(chapter.id)}
                    className="w-full gap-2 border-dashed"
                  >
                    <Plus className="w-4 h-4" />
                    Add Lesson
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {chapters.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 mb-4">No chapters yet</p>
          <Button onClick={addChapter} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Your First Chapter
          </Button>
        </div>
      )}
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Course Preview</h2>
        <p className="text-gray-500">
          Review your course before publishing or saving as draft
        </p>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Basic Information</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-500">Title:</span>
            <p className="font-semibold">{formData.title || "Not provided"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Subtitle:</span>
            <p>{formData.subtitle || "Not provided"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Description:</span>
            <p>{formData.description || "Not provided"}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-sm text-gray-500">Category:</span>
              <p className="font-medium">{formData.category || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Level:</span>
              <p className="font-medium">{formData.level || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Language:</span>
              <p className="font-medium">{formData.language || "N/A"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Price:</span>
              <p className="font-medium">
                {formData.price ? `$${formData.price}` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Curriculum</h3>
        <div className="space-y-4">
          {chapters.map((chapter, idx) => (
            <div key={chapter.id}>
              <h4 className="font-semibold mb-2">
                Chapter {idx + 1}: {chapter.title || "Untitled Chapter"}
              </h4>
              <ul className="ml-6 space-y-1">
                {chapter.lessons.map((lesson, lessonIdx) => (
                  <li key={lesson.id} className="text-sm text-gray-600">
                    {lessonIdx + 1}. {lesson.title || "Untitled Lesson"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {chapters.length === 0 && (
            <p className="text-gray-500">No curriculum added yet</p>
          )}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {renderStepIndicator()}

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        {step === 1 && renderBasicInfo()}
        {step === 2 && renderCurriculum()}
        {step === 3 && renderPreview()}
      </div>

      <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          Previous
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={saveDraft}
            className="gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save as Draft
          </Button>

          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Next Step</Button>
          ) : (
            <Button
              onClick={publishCourse}
              className="gap-2 bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              Publish Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const UploadCoursePage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <UploadCourseContent />
    </Suspense>
  );
};

export default UploadCoursePage;
