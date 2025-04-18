interface Quotes {
  _id: string;
  content: string;
  author: string;
  tags: [];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

interface Quote {
    _id: string,
    content: string,
    author: string,
    tags: [],
    authorSlug: string,
    length: number,
    dateAdded: string,
    dateModified: string
}

interface New {
  id: string;
  string: string;
}

// ag