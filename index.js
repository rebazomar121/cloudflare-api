const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()

const ZONE_ID = process.env.ZONE_ID
const API_TOKEN = process.env.API_TOKEN

/**
 * Create a DNS Record in Cloudflare
 *
 * @param {Object} param0 - DNS Record
 * @param {string} param0.type - DNS Record Type
 * @param {string} param0.name - DNS Record Name
 * @param {string} param0.content - DNS Record Content
 * @param {number} param0.ttl - DNS Record TTL
 * @param {boolean} param0.proxied - DNS Record Proxied
 * @returns {Promise<void>}
 */
async function createDNSRecord({
  type = "A",
  name = "cat",
  content = "111.111.111.111",
  ttl = 1,
  proxied = true,
}) {
  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`,
      {
        type,
        name,
        content,
        ttl,
        proxied,
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )

    console.log("DNS Record Created:", response.data)
  } catch (error) {
    console.error(
      "Error creating DNS record:",
      error.response ? error.response.data : error.message
    )
  }
}

createDNSRecord({
  type: "A",
  name: "pity",
  content: "111.111.111.111",
})