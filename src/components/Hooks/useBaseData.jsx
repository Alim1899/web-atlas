import { useQuery } from "@tanstack/react-query";

export default function useBaseData(id) {
  return useQuery({
    queryKey: ["base", id],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}data/${id}.json`);
      if (!res.ok) throw new Error(`${id}.json ვერ ჩაიტვირთა`);
      return res.json();
    },
    staleTime: Infinity,
  });
}