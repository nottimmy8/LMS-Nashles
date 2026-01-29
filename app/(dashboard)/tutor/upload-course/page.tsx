"use client";

import React, { useState } from "react";
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
} from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  description: string;
};

type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type CourseFormData = {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  language: string;
  price: string;
  thumbnail: string;
  chapters: Chapter[];
};

const UploadCoursePage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    language: "",
    price: "",
    thumbnail: "",
    chapters: [],
  });

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "",
      lessons: [],
    },
  ]);

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

  const saveDraft = () => {
    console.log("Saving draft...", { ...formData, chapters });
    // TODO: Implement API call to save draft
  };

  const publishCourse = () => {
    console.log("Publishing course...", { ...formData, chapters });
    // TODO: Implement API call to publish course
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
        <Label>Course Title *</Label>
        <Field>
          <input
            type="text"
            placeholder="e.g., Complete Web Development Bootcamp"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Label>Course Subtitle</Label>
        <Field>
          <input
            type="text"
            placeholder="e.g., Learn HTML, CSS, JavaScript, React and more"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Label>Course Description *</Label>
        <Field>
          <textarea
            placeholder="Describe what students will learn in this course..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </Field>
      </FieldGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FieldGroup>
          <Label>Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="mobile-development">
                Mobile Development
              </SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>Level *</Label>
          <Select
            value={formData.level}
            onValueChange={(value) =>
              setFormData({ ...formData, level: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="all-levels">All Levels</SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>Language *</Label>
          <Select
            value={formData.language}
            onValueChange={(value) =>
              setFormData({ ...formData, language: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>Price (USD) *</Label>
          <Field>
            <input
              type="number"
              placeholder="49.99"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>
        </FieldGroup>
      </div>

      <FieldGroup>
        <Label>Course Thumbnail *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG or WEBP (recommended: 1280x720px)
          </p>
          <input type="file" className="hidden" accept="image/*" />
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
                      className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg"
                    >
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
                        className="gap-2 bg-white"
                      >
                        <Upload className="w-4 h-4" />
                        Upload Video
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeLesson(chapter.id, lesson.id)}
                        className="text-red-500 hover:bg-red-50 bg-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
          <Button variant="outline" onClick={saveDraft} className="gap-2">
            <Save className="w-4 h-4" />
            Save as Draft
          </Button>

          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Next Step</Button>
          ) : (
            <Button
              onClick={publishCourse}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              Publish Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCoursePage;
