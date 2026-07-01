import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, orderBy, Timestamp, increment } from "firebase/firestore";
import { db } from "./config";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  coverImage?: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  views?: number;
}

const COLLECTION_NAME = "posts";

export async function getPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const docRef = doc(db, COLLECTION_NAME, slug);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as BlogPost;
  }
  
  return null;
}

export async function createPost(postData: Omit<BlogPost, "id" | "createdAt">): Promise<void> {
  // Use slug as the document ID for easy querying by slug
  const docRef = doc(collection(db, COLLECTION_NAME), postData.slug);
  await setDoc(docRef, {
    ...postData,
    createdAt: Timestamp.now(),
  });
}

export async function updatePost(slug: string, postData: Partial<BlogPost>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, slug);
  await updateDoc(docRef, postData);
}

export async function deletePost(slug: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, slug);
  await deleteDoc(docRef);
}

// PROJECTS
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string; // Markdown content
  repoUrl?: string;
  liveUrl?: string;
  technologies: string[];
  coverImage?: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  views?: number;
}

const PROJECTS_COLLECTION = "projects";

export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, PROJECTS_COLLECTION), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const docRef = doc(db, PROJECTS_COLLECTION, slug);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }
  
  return null;
}

export async function createProject(projectData: Omit<Project, "id" | "createdAt">): Promise<void> {
  const docRef = doc(collection(db, PROJECTS_COLLECTION), projectData.slug);
  await setDoc(docRef, {
    ...projectData,
    createdAt: Timestamp.now(),
  });
}

export async function updateProject(slug: string, projectData: Partial<Project>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, slug);
  await updateDoc(docRef, projectData);
}

export async function deleteProject(slug: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, slug);
  await deleteDoc(docRef);
}

// METRICS & ANALYTICS

export async function incrementGlobalVisits(): Promise<void> {
  const docRef = doc(db, "metrics", "visits");
  await setDoc(docRef, { count: increment(1) }, { merge: true });
}

export async function getGlobalVisits(): Promise<number> {
  const docRef = doc(db, "metrics", "visits");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().count || 0;
  }
  return 0;
}

export async function saveUserMetrics(user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null }): Promise<void> {
  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastLogin: Timestamp.now()
  }, { merge: true });
}

export async function getUsersCount(): Promise<number> {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.size;
}

export async function incrementPostViews(slug: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, slug);
  await updateDoc(docRef, {
    views: increment(1)
  });
}
