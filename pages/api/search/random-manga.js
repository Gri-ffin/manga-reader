import MFA from 'mangadex-full-api';

export default async function handler(req, res) {
  await MFA.login(process.env.Username, process.env.Password);
  const randomMangaId = await MFA.Manga.getRandom();
  return res.json({ mangaId: randomMangaId.id });
}
