import { useEffect } from "react";
import { SITE_URL } from "@/lib/site";

type PageMetadataProps = {
  title: string;
  description: string;
  path: string;
};

export function PageMetadata({ title, description, path }: PageMetadataProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    const canonicalUrl = `${SITE_URL}${path}`;
    const updates = [
      [
        "meta[name='description']",
        "meta",
        "name",
        "description",
        "content",
        description,
      ],
      [
        "meta[property='og:title']",
        "meta",
        "property",
        "og:title",
        "content",
        title,
      ],
      [
        "meta[property='og:description']",
        "meta",
        "property",
        "og:description",
        "content",
        description,
      ],
      [
        "meta[property='og:url']",
        "meta",
        "property",
        "og:url",
        "content",
        canonicalUrl,
      ],
      [
        "meta[name='twitter:title']",
        "meta",
        "name",
        "twitter:title",
        "content",
        title,
      ],
      [
        "meta[name='twitter:description']",
        "meta",
        "name",
        "twitter:description",
        "content",
        description,
      ],
      [
        "link[rel='canonical']",
        "link",
        "rel",
        "canonical",
        "href",
        canonicalUrl,
      ],
    ];
    const restore = updates.map(
      ([selector, tag, key, value, attribute, content]) => {
        let element = document.head.querySelector(selector);
        const existing = Boolean(element);
        if (!element) {
          element = document.createElement(tag);
          element.setAttribute(key, value);
          document.head.appendChild(element);
        }
        const target = element;
        const previous = target.getAttribute(attribute);
        target.setAttribute(attribute, content);
        return () => {
          if (!existing) target.remove();
          else if (previous === null) target.removeAttribute(attribute);
          else target.setAttribute(attribute, previous);
        };
      }
    );
    return () => {
      document.title = previousTitle;
      restore.forEach(undo => undo());
    };
  }, [title, description, path]);

  return null;
}
