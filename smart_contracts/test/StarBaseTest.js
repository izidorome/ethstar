let StarBase = artifacts.require("StarBase");

contract("StarBase", async (accounts) => {
  let instance;
  let owner = accounts[0];
  let rafa = accounts[1];
  let vitalik = accounts[2];
  let satoshi = accounts[3];
  let dec = 'dec_121.874';
  let mag = 'mag_245.978';
  let cen = 'cen_32';

  beforeEach(async () => {
    instance = await StarBase.new();
      await instance.createStar('Story Star', dec, mag, cen, {from: rafa});
  });

  describe("createStar", async () => {
    it('should save star with valid data', async () => {
      let star = await instance.stars(0);

      assert.equal(star[0], 'Story Star');
      assert.equal(star[1], dec);
      assert.equal(star[2], mag);
      assert.equal(star[3], cen);
    });

    it('should not allow already registered star', async () => {
      let error = { message: '' }

      try {
        await instance.createStar('Story Star', dec, mag, cen, {from: vitalik});
      } catch(err) {
        error = err;
      }

      assert.equal(error.message, 'VM Exception while processing transaction: revert Star already registered');
    });
  })

  describe("checkIfStarExist", async () => {
    it('should return true if star already registered', async () => {
      let exists = await instance.checkIfStarExist(dec, mag, cen);

      assert.equal(exists, true);
    });

    it('should return false if star does not exists', async () => {
      let exists = await instance.checkIfStarExist(dec, mag, '123');

      assert.equal(exists, false);
    });
  });

  describe("tokenIdToStarInfo", async () => {
    it("should return star info data", async () => {
      let star = await instance.tokenIdToStarInfo(1);

      assert.equal(star[0], 'Star Power #1');
      assert.equal(star[1], 'Story Star');
      assert.equal(star[2], dec);
      assert.equal(star[3], mag);
      assert.equal(star[4], cen);
    });
  });

  describe("mint", async () => {
    it("should mint new token", async () => {
      await instance.mint(rafa, 999, {from: owner});

      let tokenOwner = await instance.ownerOf(999);

      assert.equal(tokenOwner, rafa);
    });
  });

  describe("ownerOf", async () => {
    it("should returns the owner of a token", async () => {
      let tokenOwner = await instance.ownerOf(1);

      assert.equal(tokenOwner, rafa);
    });
  });

  describe("approve", async () => {
    it("should approve an address", async () => {
      await instance.approve(satoshi, 1, {from: rafa});
      let error = null;

      try {
        await instance.transferFrom(rafa, vitalik, 1, {from: satoshi});
      } catch(err) {
        error = err;
      }

      assert.equal(error, null);
    });
  });

  describe("setApprovalForAll", async () => {
    it("should approve an address to all tokens", async () => {
      await instance.setApprovalForAll(satoshi, true, {from: rafa});
      let error = null;

      try {
        await instance.transferFrom(rafa, vitalik, 1, {from: satoshi});
      } catch(err) {
        error = err;
      }

      assert.equal(error, null);
    });
  });

  describe("getApproved, isApprovedForAll", async () => {
    it("satoshi should get approved", async () => {
      await instance.approve(satoshi, 1, {from: rafa});
      let approval = await instance.getApproved(1);

      assert.equal(approval, satoshi);
    });

    it("satoshi should get approved for all", async () => {
      await instance.setApprovalForAll(satoshi, true, {from: rafa});
      let approval = await instance.isApprovedForAll(rafa, satoshi);

      assert.equal(approval, true);
    });
  });

  describe("safeTransferFrom", async () => {
    it("should transfer token to specified address", async () => {
      await instance.safeTransferFrom(rafa, satoshi, 1, {from: rafa});
      let newOwner = await instance.ownerOf(1);

      assert.equal(newOwner, satoshi);
    });
  });
})