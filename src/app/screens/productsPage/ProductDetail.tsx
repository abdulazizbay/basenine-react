import { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import { Link, useParams } from 'react-router-dom';
import type { Product } from '../../../lib/types/product';
import { serverApi } from '../../../lib/config';
import { useCart } from '../../hooks/useCart';
import { teamOf } from '../../../lib/utils/relations';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ImageWithFallback from '../../components/ui/ImageWithFallback';

export const ProductDetail = () => {
	const { productId } = useParams<{ productId: string }>();
	const { onAdd } = useCart();
	const [chosenProduct, setChosenProduct] = useState<Product | null>(null);
	const outOfStock = chosenProduct
		? chosenProduct.productLeftCount <= 0
		: false;

	useEffect(() => {
		if (!productId) return;
		const productService = new ProductService();
		productService
			.getProduct(productId)
			.then((result) => setChosenProduct(result))
			.catch((err) => console.log(err));
	}, [productId]);
	const chosenProductTeam = chosenProduct ? teamOf(chosenProduct.teamId) : null;
	if (!chosenProduct) return null;
	return (
		<div>
			<section className="bg-linear-to-b from-bn-surface to-bn-bg pb-16 pt-32 sm:pt-40">
				<Container className="flex flex-col gap-10 lg:flex-row lg:items-start">
					<div className="lg:flex-1">
						<ImageWithFallback
							src={`${serverApi}/${chosenProduct.productImages[0]}`}
							alt={chosenProduct.productName}
							className="h-[420px] w-full rounded-2xl bg-bn-surface-2"
						/>
					</div>

					<div className="flex flex-col lg:flex-1">
						<span className="self-start rounded-full bg-bn-surface-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-bn-muted">
							{chosenProduct.productCollection}
						</span>
						<h1 className="mt-4 font-display text-3xl font-bold text-bn-white sm:text-4xl">
							{chosenProduct.productName}
						</h1>

						<div className="mt-4 flex items-center gap-5 text-sm">
							<span className="text-bn-muted">
								{chosenProduct.productViews.toLocaleString()} views
							</span>
							<span
								className={`font-semibold ${outOfStock ? 'text-bn-muted' : 'text-bn-red-light'}`}
							>
								{outOfStock
									? 'Sold out'
									: `${chosenProduct.productLeftCount} in stock`}
							</span>
						</div>

						{chosenProductTeam && (
							<Link to={`/teams/${chosenProductTeam._id}`} className="mt-6 block">
								<Card className="flex items-center gap-3.5 px-4 py-3">
									<ImageWithFallback
										src={`${serverApi}/${chosenProductTeam.teamImage[0]}`}
										alt={chosenProductTeam.teamNick}
										className="h-10 w-10 rounded-full"
									/>
									<div className="flex flex-col">
										<span className="text-[10px] uppercase tracking-wide text-bn-muted">
											Team
										</span>
										<span className="font-display text-sm font-bold text-bn-white">
											{chosenProductTeam.teamNick}
										</span>
									</div>
									<span className="ml-auto text-bn-red">&rarr;</span>
								</Card>
							</Link>
						)}

						<p className="mt-6 text-sm leading-relaxed text-bn-muted">
							{chosenProduct.productDesc ||
								'No description available for this product.'}
						</p>

						<div className="mt-8 flex items-center justify-between border-t border-bn-border pt-8">
							<span className="font-display text-3xl font-extrabold text-bn-white">
								${chosenProduct.productPrice.toFixed(2)}
							</span>
							<Button
								disabled={outOfStock}
								onClick={() => {
									if (outOfStock) return;

									onAdd({
										_id: chosenProduct._id,
										quantity: 1,
										name: chosenProduct.productName,
										price: chosenProduct.productPrice,
										image: chosenProduct.productImages[0],
									});
								}}
							>
								{outOfStock ? 'Sold Out' : 'Add to Cart'}
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</div>
	);
};
