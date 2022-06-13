import MFA from 'mangadex-full-api';

export default function handler(req, res) {
  function transformArray(array) {
    const newResult = array.map(async manga => {
      let coverImage =
        manga.mainCover && (await MFA.Cover.get(manga.mainCover.id));
      return {
        id: manga.id,
        title: manga.title,
        coverImage: coverImage?.imageSource || ''
      };
    });
    return Promise.all(newResult);
  }

  if (req.method === 'POST') {
    const { mangaIds } = req.body;
    MFA.login(process.env.Username, process.env.Password).then(async () => {
      const result = await MFA.Manga.getMultiple(...mangaIds);
      const transformedResult = await transformArray(result);
      res.json({ transformedResult });
    });
  }
}
