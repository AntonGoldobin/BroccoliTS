import axios from 'axios';

export interface IPost {
  id: string;
  url: string;
  rate: number;
  createdAt: string;
}

export const getImagesBySubredditName = async (
  subredditName: string = 'gonewild',
): Promise<IPost[]> => {
  const res = await axios.get(
    `https://www.reddit.com/r/${subredditName}/top.json`,
    {
      params: { limit: 100, include_over_18: true },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
      },
    },
  );

  if (!res.data?.data?.children) {
    return [];
  }

  const data2: IPost[] = res?.data?.data?.children.reduce(
    (acc: IPost[], child: any) => {
      const post = child?.data;

      const acceptableFormats = ['png', 'jpeg', 'jpg'];

      if (
        post.url_overridden_by_dest &&
        acceptableFormats.some((format) =>
          post.url_overridden_by_dest.includes(format),
        )
      ) {
        return [
          ...acc,
          { id: post.id, url: post.url_overridden_by_dest, rate: post.score },
        ];
      }

      return acc;
    },
    [],
  );

  return data2.sort((a, b) => b.rate - a.rate);
};
