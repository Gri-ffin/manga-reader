import MFA from 'mangadex-full-api';

export default async function handler(req, res) {
  const chapterId = req.body.chapterId;
  try {
    await MFA.login('BaylordYama', 'redamohamed0');
    const result = await MFA.Chapter.get(chapterId);
    const resultPages = await result.getReadablePages();
    return res.json({ pages: resultPages });
  } catch (e) {
    res.json({ error: e.message });
  }
}
