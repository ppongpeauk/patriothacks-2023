= np.random.choice(
            range(1, category_counts[category] + 1),
            num_interactions,
            p=np.random.dirichlet(np.ones(category_counts[category]), size=1)[0],
        )