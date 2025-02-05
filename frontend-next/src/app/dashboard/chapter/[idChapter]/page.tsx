"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChapterForm from "@/components/Dashboard/Chapters/ChapterForm";
import { getChapterById } from "@/Services/chapterService";
import { Chapter } from "@/types/chapter";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import { AxiosError } from 'axios';

const ChapterPage = () => {
    const { idChapter } = useParams();
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchChapter = async () => {
        try {
            const data = await getChapterById(Number(idChapter));
            setChapter(data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            console.error("Error fetching chapter:", axiosError);
        
            const errorMessage = axiosError.response?.data?.message || "Failed to fetch chapter.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idChapter) {
            fetchChapter();
        }
    }, [idChapter]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <p className="text-lg text-gray-700 dark:text-gray-300">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-24 max-w-7xl mx-auto">
                    <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-800/70 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="p-6 sm:p-8">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-8">
                                Edit Chapter
                            </h1>
                            <ChapterForm chapter={chapter} />
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                © 2024 Your Company. All rights reserved.
            </footer>
        </div>
    );
};

export default ChapterPage;
