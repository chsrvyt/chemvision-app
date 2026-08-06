import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  QueryConstraint,
  DocumentData,
  DocumentReference,
  WithFieldValue,
  PartialWithFieldValue,
  UpdateData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export class FirestoreService<T extends DocumentData> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  // Base methods for CRUD operations to be used by specific feature services
  async get(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  }

  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    const q = query(collection(db, this.collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as T);
  }

  async create(id: string, data: WithFieldValue<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id) as DocumentReference<T, T>;
    await setDoc(docRef, data);
  }

  async update(id: string, data: PartialWithFieldValue<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id) as DocumentReference<T, T>;
    await updateDoc(docRef, data as UpdateData<T>);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionName, id));
  }
}
