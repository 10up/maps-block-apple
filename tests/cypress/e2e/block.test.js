describe("Test block functions", () => {
	beforeEach(() => {
		cy.login();
		cy.mapsBlockSaveSettings();
	});

	it("Should insert map", () => {
		cy.createPost({
			title: "Correct Map Post",
			beforeSave: () => {
				cy.insertBlock("tenup/maps-block-apple", "apple maps").then((id) => {
					cy.get(`#${id}`).then((block) => {
						expect(block.find(".mk-map-view").length > 0);
					});
				});
			},
		});
	});

	it("Should display confirm access form", () => {
		// Simulate empty settings.
		cy.mapsBlockSaveSettings("");

		cy.createPost({
			title: "Broken Map Post",
			beforeSave: () => {
				cy.insertBlock("tenup/maps-block-apple", "apple maps").then((block) => {
					cy.get(`#${block}`).should(
						"contain.text",
						"Confirm access to Apple Maps"
					);
				});
			},
		});
	});
});
