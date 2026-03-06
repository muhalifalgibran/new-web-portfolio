import { useState, useEffect } from 'react';
import { getPersonalInfo } from '@/lib/api';
import { personalInfo, navigationLabels, sectionLabels } from '@/data/personal';

const fallback = {
  personalInfo,
  skills: personalInfo.skills,
  certifications: personalInfo.certifications,
  awards: personalInfo.awards,
  navigationLabels,
  sectionLabels,
};

export function usePersonalInfo() {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getPersonalInfo()
      .then(result => {
        if (!cancelled) setData(result);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { ...data, loading };
}
