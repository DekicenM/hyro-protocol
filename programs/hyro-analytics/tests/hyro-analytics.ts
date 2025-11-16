import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HyroAnalytics } from "../target/types/hyro_analytics";
import { expect } from "chai";

describe("hyro-analytics", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HyroAnalytics as Program<HyroAnalytics>;
  const owner = provider.wallet;

  it("Initializes trader badge", async () => {
    const [traderBadge] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("trader_badge"), owner.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .initialize()
      .accounts({
        traderBadge: traderBadge,
        owner: owner.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const badge = await program.account.traderBadge.fetch(traderBadge);
    expect(badge.owner.toString()).to.equal(owner.publicKey.toString());
    expect(badge.winRate.toNumber()).to.equal(0);
    expect(badge.totalProfit.toNumber()).to.equal(0);
  });

  it("Updates trader stats", async () => {
    const [traderBadge] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("trader_badge"), owner.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .updateStats(new anchor.BN(75), new anchor.BN(10000), new anchor.BN(2))
      .accounts({
        traderBadge: traderBadge,
        owner: owner.publicKey,
      })
      .rpc();

    const badge = await program.account.traderBadge.fetch(traderBadge);
    expect(badge.winRate.toNumber()).to.equal(75);
    expect(badge.totalProfit.toNumber()).to.equal(10000);
    expect(badge.accountTier.toNumber()).to.equal(2);
  });
});

