import { QueryKey } from '@tanstack/react-query'

export const generateUrlFromQueryKey = (queryKeys: QueryKey) =>
	queryKeys.reduce<string>(
		(previousUrl, queryKey) =>
			queryKey && typeof queryKey === 'object'
				? `${previousUrl}${Object.entries(queryKey).reduce(
						(previousPartOfUrl, [key, value], index) =>
							`${previousPartOfUrl}${index === 0 ? '?' : '&'}${key}=${
								Array.isArray(value) ? value.join(',') : value
							}`,
						'',
					)}`
				: `${previousUrl}/${queryKey}`,
		'',
	)

type IgnoreObject = {
	ignore: boolean
}

export function isKeyWithIgnore<T>(key: T): key is T & IgnoreObject {
	return typeof key === 'object' && (key as unknown as IgnoreObject)?.ignore
}

export function getIgnoredKey<T extends Record<string, unknown>>(key: T) {
	const ignoreObject = { ignore: true }
	return { ...ignoreObject, ...key }
}

export const formatCurrencyAmount = (value: number | undefined | null) =>
	value !== undefined &&
	value !== null &&
	new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(
		value,
	)
