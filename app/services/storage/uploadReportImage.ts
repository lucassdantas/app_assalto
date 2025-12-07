import * as FileSystem from "expo-file-system/legacy";

function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

export async function uploadReportImage(uri: string) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const arrayBuffer = base64ToArrayBuffer(base64);
  const fileName = `reports/${Date.now()}.jpg`;

  // TODO: enviar pro bucket
  // const { error } = await supabase.storage
  //   .from("reports_images_bucket")
  //   .upload(fileName, arrayBuffer, {
  //     contentType: "image/jpeg",
  //     upsert: false,
  //   });

  // if (error) throw error;

  return ''; // ou retorne a URL quando ativar o bucket
}
