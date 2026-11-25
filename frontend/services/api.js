import { File } from 'expo-file-system';

const Backend_Url = 'http://10.111.199.129:8000';

export async function analysePhoto(photoUri) {
  const form = new FormData();
  form.append('photo', new File(photoUri));

  const response = await fetch(Backend_Url + '/analyse',
    {
      method: 'POST',
      body: form,
    });
  const data = await response.json();

  return { ok: response.ok, data: data };
}
