export interface ChapterResponseProps {
    id: number;
    name: string;
    name_meaning: string;
    chapter_number: number;
    verses_count: number;
    chapter_summary: string;
    chapter_summary_hindi: string;
}

export interface CommentaryTypes {
    id: number;
    description: string;
    author_name: string;
    language: string;
}

export interface SingleVerseProps {
    id: number;
    verse_number: number;
    chapter_number: number;
    slug: string;
    text: string;
    commentaries: [];
}