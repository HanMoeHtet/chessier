import React, { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });
let prevPage: null | React.ReactElement = null;

interface Props {
  loadComponent: () => Promise<{ default: React.FC<{}> }>;
}

const Page: React.FC<Props> = ({ loadComponent }) => {
  const [loadedComponent, setLoadedComponent] =
    useState<React.ReactElement | null>(null);

  useEffect(() => {
    (async () => {
      const { default: Component } = await loadComponent();
      setLoadedComponent(<Component />);
    })();
  }, [loadComponent]);

  if (!loadedComponent) {
    NProgress.start();
    return prevPage;
  }

  NProgress.done();
  prevPage = loadedComponent;
  return loadedComponent;
};

export default Page;
