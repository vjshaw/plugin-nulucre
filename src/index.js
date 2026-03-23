import axios from 'axios';

const NULUCRE_BASE_URL = 'https://nulucre.com';

const checkWalletReputation = {
  name: 'CHECK_WALLET_REPUTATION',
  description: 'Check the reputation score of any EVM wallet address across 81+ chains. Returns a 0-100 trust score with breakdown by wallet age, transaction volume, DeFi activity, and multi-chain presence. Uses x402 micropayment of $0.003 USDC on Base.',
  examples: [[
    {
      user: 'user',
      content: { text: 'What is the reputation score of wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045?' }
    },
    {
      user: 'agent',
      content: { text: 'Let me check that wallet reputation score for you.' }
    }
  ]],
  validate: async (runtime, message) => {
    const text = message.content.text || '';
    return /0x[a-fA-F0-9]{40}/.test(text);
  },
  handler: async (runtime, message, state, options, callback) => {
    try {
      const text = message.content.text || '';
      const match = text.match(/0x[a-fA-F0-9]{40}/);
      if (!match) {
        callback({ text: 'Please provide a valid EVM wallet address (0x...)' });
        return;
      }
      const wallet = match[0];
      const response = await axios.get(
        `${NULUCRE_BASE_URL}/reputation/${wallet}`,
        { headers: { 'x-payment': 'x402' } }
      );
      const data = response.data;
      const result = `Wallet Reputation Score for ${wallet}:
Score: ${data.score}/100 — ${data.status}
Wallet Age: ${data.breakdown.walletAge.raw} (${data.breakdown.walletAge.score}/30)
TX Volume: ${data.breakdown.txVolume.raw} (${data.breakdown.txVolume.score}/40)
DeFi Activity: ${data.breakdown.defiActivity.raw} (${data.breakdown.defiActivity.score}/20)
Multi-Chain: ${data.breakdown.multiChain.raw} (${data.breakdown.multiChain.score}/10)
Ankr Coverage: ${data.breakdown.ankrCoverage.raw} (${data.breakdown.ankrCoverage.score}/10)
Chains: ${data.chains.join(', ')}`;
      callback({ text: result });
    } catch (error) {
      callback({ text: `Error checking wallet reputation: ${error.message}` });
    }
  }
};

const verifyDefiClaim = {
  name: 'VERIFY_DEFI_CLAIM',
  description: 'Verify a DeFi protocol TVL claim against DeFi Llama on-chain data. Returns ACCURATE, MISLEADING, or FALSE verdict. Uses x402 micropayment of $0.01 USDC on Base.',
  examples: [[
    {
      user: 'user',
      content: { text: 'Is it true that Aave has $12B TVL?' }
    },
    {
      user: 'agent',
      content: { text: 'Let me verify that DeFi claim for you.' }
    }
  ]],
  validate: async (runtime, message) => {
    const text = message.content.text || '';
    const defiKeywords = ['tvl', 'billion', 'million', 'protocol', 'defi', 'aave', 'uniswap', 'compound', 'locked'];
    return defiKeywords.some(k => text.toLowerCase().includes(k));
  },
  handler: async (runtime, message, state, options, callback) => {
    try {
      const text = message.content.text || '';
      const response = await axios.post(
        `${NULUCRE_BASE_URL}/verify`,
        { claim: text },
        { headers: { 'x-payment': 'x402', 'Content-Type': 'application/json' } }
      );
      const data = response.data;
      const result = `DeFi Claim Verification:
Verdict: ${data.verdict}
Claimed TVL: ${data.claimedTvl || 'N/A'}
Actual TVL: ${data.actualTvl || 'N/A'}
Discrepancy: ${data.discrepancy || 'N/A'}
Source: ${data.source || 'DeFi Llama'}`;
      callback({ text: result });
    } catch (error) {
      callback({ text: `Error verifying DeFi claim: ${error.message}` });
    }
  }
};

const nulucrePlugin = {
  name: 'nulucre',
  description: 'The credit score for crypto wallets. Wallet reputation scoring across 81+ chains with ECDSA signed proofs and DeFi TVL fact verification via x402 micropayments on Base.',
  actions: [checkWalletReputation, verifyDefiClaim]
};

export default nulucrePlugin;
export { nulucrePlugin };
