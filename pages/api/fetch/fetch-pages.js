import MFA from 'mangadex-full-api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const chapterId = req.body.chapterId;
    try {
      await MFA.login(process.env.Username, process.env.Password);
      const result = await MFA.Chapter.get(chapterId);
      const resultPages = await result.getReadablePages();
      const manga = await result.manga.resolve();
      const chapters = await manga.getFeed(
        {
          translatedLanguage: ['en'],
          order: { chapter: 'asc' },
          limit: Infinity
        },
        false
      );
      const filteredChapters = chapters.filter(chapter => {
        return chapter.isExternal === false;
      });
      const transformedChapters = filteredChapters.map(chapter => ({
        id: chapter.id,
        chapter: chapter.chapter
      }));
      return res.json({
        pages: resultPages,
        chapters: transformedChapters
      });
    } catch (e) {
      res.json({ error: e.message });
    }
  }
}
