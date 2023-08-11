const fs = require('fs');
const yaml = require('js-yaml');

const fetchData = (filePath) => {
  const deger = '/data/user.md'
  if (filePath === deger) {
    console.log('888888888', true)
  }
  const markdownContent = fs.readFileSync(`${process.cwd()}${filePath}`, 'utf-8');
  const yamlData = yaml.load(markdownContent);

  return yamlData
}

export default async function handler(req, res) {
  try {
    const { file } = req.query;

    if (!file) {
      return res.status(400).json({ error: 'file parameter is missing.' });
    }

    const data = fetchData('/data/user.md')

    res.status(200).json({
      data
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      errors: ["Error encountered while reading readme file"]
    })
  }
}
