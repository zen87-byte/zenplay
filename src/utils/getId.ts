import { useRouter } from 'next/router';

export function getIdFromUrl(): number {
 const router = useRouter();
 const { id } = router.query;

 if (typeof id === 'string') {
    return parseInt(id, 10);
 }
}