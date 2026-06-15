import { Search } from "lucide-react";
import { useTranslate } from "@/i18n/hooks/useTranslate";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
};

const CATEGORIES = [
    "Semua",
    "Kajian",
    "Keuangan",
    "Kegiatan",
];

export default function ArticleSearchFilter({
    search,
    setSearch,
    category,
    setCategory,
}: Props) {
    
    const { t } = useTranslate();

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-10">

            {/* Search */}
            <div className="relative flex-1">
                <Search
                    className="
                    absolute
                    left-3.5
                    top-1/2
                    z-10
                    size-4.5
                    -translate-y-1/2
                    text-gray-400
                    "
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("articles.search")}
                    className="h-12 w-full rounded-2xl border border-gray-200/50 bg-white pl-11 pr-4 text-sm font-medium text-gray-700 placeholder:text-gray-400 outline-none shadow-[inset_0_2px_6px_rgb(0_0_0/0.05)] transition-all duration-200 hover:border-emerald-200 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100/70"
                />
            </div>

            {/* Category */}
            <div className="md:w-60">
                <Select
                    value={category}
                    onValueChange={setCategory}
                >
                    <SelectTrigger
                        className="h-15 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-emerald-200 focus:ring-0 focus:ring-offset-0 focus:border-emerald-300 data-placeholder:text-gray-400 [&>svg]:size-4 [&>svg]:text-gray-400"
                    >
                        <SelectValue placeholder={t("articles.categories.Semua")} />
                    </SelectTrigger>

                    <SelectContent
                        sideOffset={8}
                        className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
                    >
                        {CATEGORIES.map((cat) => (
                            <SelectItem
                                key={cat}
                                value={cat} 
                                className="h-11 cursor-pointer rounded-xl px-3 text-sm font-medium text-gray-700 transition-colors focus:bg-emerald-50 focus:text-simas-primary data-[state=checked]:bg-emerald-50 data-[state=checked]:text-simas-primary"
                            >
                                {/* Teks yang tampil di layar diterjemahkan secara dinamis menggunakan Enum Mapping */}
                                {t(`articles.categories.${cat}`)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}