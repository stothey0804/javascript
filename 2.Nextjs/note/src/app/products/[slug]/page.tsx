import { type } from "os";
import React from "react";

// ts 정의
type Props = {
	params: {
		slug: string;
	};
};
export default function ProductsPantsPage({ params }: Props) {
	return <h1>{params.slug} Page</h1>;
}

export function generateStaticParams() {
	const products = ["pants", "skirts", "bags", "shoes"];
	return products.map((product) => ({
		slug: product,
	}));
}
