import { Configuration, OpenAIApi } from "openai";

export async function gpt(interaction) {
    await interaction.deferReply();
	const prompt = interaction.options.getString("text");
	
	if (!prompt) {
		interaction.editReply("Missing a message.");
		return;
	}
	const tkn = process.env.aikey;
	const config = new Configuration({
		apiKey: tkn
	});
	const openai = new OpenAIApi(config);
	let rs;
	try {
		rs = await openai.createCompletion({
			model: "text-davinci-003",
			max_tokens: 460,
			prompt
		});
		const str = rs.data.choices[0].text;
		
		let cutstr = str.slice(0, 1999);
		if(cutstr.length == 0){
			cutstr = "no response <:cat_sad:877564048332456036>";
		}
		await interaction.editReply(cutstr);
		if (str.length > 1999) {
			await interaction.followUp(str.slice(2000));
		}
	} catch (rr) {
		interaction.editReply("AI is probably broken check logs on the server <:meska_sad:865674800805838898>");
		console.log(rr);
		if (rr.response && rr.response.data && rr.response.data.error) {
			await interaction.followUp(rr.response.data.error.message);
		}
	}
}