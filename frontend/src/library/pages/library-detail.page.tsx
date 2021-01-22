import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import { theme } from "shared/styles/theme.styles";
import { useRouteMatch } from "react-router-dom";

interface IMatchParams {
  page: string;
}

export const LibraryDetailPage = () => {
  const [mdText, setMdText] = useState<string>("");
  const match = useRouteMatch<IMatchParams>();

  const page = match.params.page ?? "concrete-examples";

  useEffect(() => {
    loadMdFile();

    async function loadMdFile() {
      const file = await import(`../md/${page}.md`);
      const res = await fetch(file.default);
      const text = await res.text();
      setMdText(text);
    }
  }, [page]);

  return (
    <SLibraryPageContent>
      <SMarkdownStyles>
        <ReactMarkdown source={mdText} />
      </SMarkdownStyles>
    </SLibraryPageContent>
  );
};

const SMarkdownStyles = styled.div`
  & > h1 {
    font-size: ${theme.fontSizes.xl};
    font-weight: 800;
    margin-top: ${theme.spacing.lg};
    margin-bottom: -${theme.spacing.sm};
  }

  & > h2 {
    border-bottom: 1px solid #333;
    font-size: ${theme.fontSizes.lg};
    padding-top: ${theme.spacing.md};
    padding-bottom: 5px;
  }

  & > p, & > ul, & > ol {
    margin-top: ${theme.spacing.sm};
    font-size: 1.8rem;
  }

  & > ul, & > ol {
    list-style-type: inherit;
    padding-left: 1.8rem;
  }

  & a {
    text-decoration: underline;
  }
`;

const SLibraryPageContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 ${theme.spacing.base} 0 ${theme.spacing.base};
`;
