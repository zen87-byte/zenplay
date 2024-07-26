"use client";

import {
  ChangeEvent,
  FormEvent,
  KeyboardEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Searchbar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef("");
  const searchParams = useSearchParams();
  const handleInputChange = (term: string) => {
    inputRef.current = term;
  };
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (inputRef.current) {
      params.set("query", inputRef.current);
      router.push(`/search?query=${inputRef.current}&page=1`);
    } else {
      params.delete("query");
    }
  }, []);
  // const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     handleSubmit;
  //   }
  // };
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();
  // const handleSearch = useDebouncedCallback((term) => {
  //   console.log(`Searching... ${term}`);

  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('query', term);
  //   } else {
  //     params.delete('query');
  //   }
  //   router.replace(`${pathname}?${params.toString()}`);
  // }, 300);
  console.log(inputRef.current);
  return (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          // value={inputValue}
          onChange={(e) => {
            handleInputChange(e.target.value);
          }}
          defaultValue={inputRef.current}
          // onKeyDown={handleKeyDown}
          placeholder="Search"
          className="block placeholder:text-white px-4 border-white rounded-xl"
        />
        <button type="submit" className="absolute px-4 top-0 right-0 h-full">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </form>
    </>
  );
};

export default Searchbar;
