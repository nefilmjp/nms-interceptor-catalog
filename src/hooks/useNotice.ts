import { useState } from 'react';
import { useMount } from 'react-use';

import { NOTICE_JSON_URL } from '@/config';

import type { UseToastOptions } from '@chakra-ui/react';

export const useNotice = (): UseToastOptions | null | undefined => {
  const [notice, setNotice] = useState<UseToastOptions | null>();

  useMount(async () => {
    const result = await fetch(NOTICE_JSON_URL)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .catch(() => null);
    setNotice(result);
  });

  return notice;
};
