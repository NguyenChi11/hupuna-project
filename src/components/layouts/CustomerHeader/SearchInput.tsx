import { useState, useEffect } from "react";
import { Input } from "@/components/ui/_base/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
  onSearch: (keyword: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    onSearch(debouncedKeyword);
  }, [debouncedKeyword, onSearch]);

  return (
    <div className="mt-4">
      <Input
        placeholder="Tìm khách hàng..."
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="sm:w-64"
      />
    </div>
  );
}
