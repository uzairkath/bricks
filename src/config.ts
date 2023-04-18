export const contractAddresses: {
	[key in
		| 'My USD'
		| 'My Rocks'
		| 'My LP'
		| 'My Bond'
		| 'MyUSD REWARDPOOL'
		| 'TaxOracle'
		| 'Boardroom'
		| 'Treasury'
		| 'ZAPPER'
		| 'My USD Oracle'
		| 'Referral'
		| 'Zero Address']: `0x${string}`;
} = {
	'My USD': '0xAD9317601872De47a92A175a94Feb18e72CB5bD5',
	'My Rocks': '0x6D635dc4a2A54664B54dF6a63e5ee31D5b29CF6e',
	'My LP': '0x85f94745D1B401617119a4E53F11484053C0EA42',
	'My Bond': '0xF347bDc0e502D33978b3c4d187bf75E5B452E491',
	'MyUSD REWARDPOOL': '0x51a93E1484C3562632d4e480ffc9BF4ac1AFe64D',
	TaxOracle: '0x1b1D898A7b27629Ff99504d8e923B6BaA4fe69F4',
	Boardroom: '0x950715C1828178343d5285948c45Ad1F713715A8',
	Treasury: '0x1A2c2204fEe5355080a1bCbC0F4E8aDd58d4b6d7',
	ZAPPER: '0x2De0b483E9eaC4189F02E4c4d805302C3b52eb7a',
	'My USD Oracle': '0x8192bC0d3CaBc8A9ffE47c3C77d85262D183c3b2',
	Referral: '0xD147c4f188a617e9f8C2e55c91306BcEa49a9918',
	'Zero Address': '0x0000000000000000000000000000000000000000',
};
