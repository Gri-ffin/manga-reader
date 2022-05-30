import MFA from 'mangadex-full-api';

export default function handler(req, res) {
  function transformArray(array) {
    const newResult = array.map(async manga => {
      let coverImage = await MFA.Cover.get(manga.mainCover.id);
      return {
        id: manga.id,
        title: manga.title,
        coverImage: coverImage.imageSource
      };
    });
    return Promise.all(newResult);
  }

  const { mangaIds } = req.body;
  MFA.login('BaylordYama', 'redamohamed0').then(async () => {
    const result = await MFA.Manga.getMultiple(...mangaIds);
    const transformedResult = await transformArray(result);
    return res.json({ transformedResult });
  });
}