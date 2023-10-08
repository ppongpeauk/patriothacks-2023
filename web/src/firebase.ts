import admin from "firebase-admin";

function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(atob(str)));
}

const serviceAccount = {
  auth_provider_x509_cert_url:
    process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  private_key: b64_to_utf8(process.env.FIREBASE_ADMIN_PRIVATE_KEY as string),
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  type: process.env.FIREBASE_ADMIN_TYPE,
} as admin.ServiceAccount;

const app = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.app();
};

app();

export { admin, app };

export async function tokenToID(token: string) {
  if (!token) {
    return null;
  }
  try {
    const user = await admin.auth().verifyIdToken(token);
    return user.uid;
  } catch (error) {
    console.log(error);
    return null;
  }
}
