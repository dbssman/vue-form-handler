export default function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}
