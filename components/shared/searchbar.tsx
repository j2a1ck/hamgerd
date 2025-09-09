"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import api from "@/lib/axios";

interface SearchbarProp {
  type: "events" | "organization";
}

interface EventResult {
  public_id: string;
  username: string;
  name: string;
  title: string;
}

interface OrganizationResult {
  public_id: string;
  username: string;
  name: string;
  title: string;
}

function useOutsideClick<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [handler]);

  return ref;
}

export default function Searchbar({ type }: SearchbarProp) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<(EventResult | OrganizationResult)[]>([]);
  const containerRef = useOutsideClick<HTMLDivElement>(() => setResults([]));

  const queryParamKey = type === "organization" ? "name" : "title";

  const handleSearch = useCallback(
    async (value: string) => {
      if (!value) return setResults([]);
      try {
        const res = await api.get(`/api/v1/${type}/`, {
          params: { [queryParamKey]: value },
        });
        setResults(res.data?.results || []);
      } catch (err) {
        console.error(`Search failed for ${type}:`, err);
      }
    },
    [type, queryParamKey]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(inputValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue, handleSearch]);

  return (
    <div className="relative mb-10 md:col-span-2">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-3 right-3 h-4 w-4" />
        <Input
          className="pr-10"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={`جستجوی ${type === "organization" ? "سازمان" : "رویداد"}...`}
        />
      </div>

      {results.length > 0 && (
        <div
          className="bg-background absolute z-10 mt-2 w-full rounded-md border shadow-sm"
          ref={containerRef}
        >
          {results.map(item => {
            const url =
              type === "organization"
                ? `/organizations/${item.username}`
                : `/events/${item.public_id}`;
            return (
              // eslint-disable-next-line @eslint-react/dom/no-missing-button-type
              <button
                className="hover:bg-card w-full cursor-pointer px-4 py-2 text-left"
                key={item.public_id}
                onClick={() => router.push(url)}
              >
                {type === "organization" ? item.name : item.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
