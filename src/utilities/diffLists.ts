type DiffResult<T> = {
  added: T[];
  removed: T[];
  updated: (T & { changes?: any })[];
};

function diffNestedLists<T>(
  list1: T[],
  list2: T[],
  idAccessor: (item: T) => any,
  nestedKey?: keyof T,
  nestedIdAccessor?: (item: any) => any
): DiffResult<T> {
  const map1 = new Map<any, T>();
  const map2 = new Map<any, T>();

  list1.forEach((item) => map1.set(idAccessor(item), item));
  list2.forEach((item) => map2.set(idAccessor(item), item));

  const added: T[] = [];
  const removed: T[] = [];
  const updated: (T & { changes?: any })[] = [];

  // Finde hinzugefügte Objekte
  for (const [id, item] of map2.entries()) {
    if (!map1.has(id)) {
      added.push(item);
    }
  }

  // Finde entfernte und aktualisierte Objekte
  for (const [id, item1] of map1.entries()) {
    const item2 = map2.get(id);
    if (!item2) {
      removed.push(item1);
    } else {
      let changes: any = {};

      // Vergleiche die restlichen Eigenschaften des Objekts
      const objChanges = diffObjects(item1, item2, [nestedKey]);
      if (Object.keys(objChanges).length > 0) {
        changes = { ...changes, ...objChanges };
      }

      // Wenn ein verschachtelter Schlüssel angegeben ist, vergleiche die verschachtelten Arrays
      if (nestedKey && nestedIdAccessor) {
        const nestedList1 = item1[nestedKey] as any[];
        const nestedList2 = item2[nestedKey] as any[];

        const nestedDiff = diffNestedLists(nestedList1, nestedList2, nestedIdAccessor);

        if (nestedDiff.added.length > 0 || nestedDiff.removed.length > 0 || nestedDiff.updated.length > 0) {
          changes[nestedKey] = nestedDiff;
        }
      }

      if (Object.keys(changes).length > 0) {
        updated.push({ ...item2, changes });
      }
    }
  }

  return { added, removed, updated };
}

function diffObjects(obj1: any, obj2: any, ignoreKeys: (string | number | symbol | undefined)[] = []): any {
  let changes: any = {};

  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of keys) {
    if (ignoreKeys.includes(key)) continue;

    const val1 = obj1[key];
    const val2 = obj2[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        changes[key] = { before: val1, after: val2 };
      }
    } else if (typeof val1 === "object" && val1 !== null && val2 !== null && typeof val2 === "object") {
      const nestedChanges = diffObjects(val1, val2);
      if (Object.keys(nestedChanges).length > 0) {
        changes[key] = nestedChanges;
      }
    } else if (val1 !== val2) {
      changes[key] = { before: val1, after: val2 };
    }
  }

  return changes;
}

export { diffNestedLists, DiffResult, diffObjects };
