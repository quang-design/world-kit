<svg class="absolute h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<!-- Main globe circle -->
	<!-- <circle cx="50" cy="50" r="50" fill="none" stroke="#f3f4f6" stroke-width="0.5" /> -->

	<!-- Globe rings vertical -->
	{#each { length: 5 } as _, index}
		<ellipse
			cx="50"
			cy="50"
			rx={50 - (index + 1) * 10}
			ry="50"
			fill="none"
			stroke="#f3f4f6"
			stroke-width="0.5"
		/>
	{/each}

	<!-- Globe rings horizontal -->
	{#each { length: 10 } as _, index}
		<line
			x1="0"
			y1={100 - (index + 1) * 10}
			x2="100"
			y2={100 - (index + 1) * 10}
			stroke="#f3f4f6"
			stroke-width="0.5"
		/>
	{/each}
</svg>
