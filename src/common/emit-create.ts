export const emitCreate = async (happening, mode, game) => {
  const url = mode.createApiUrl;

  const data = JSON.parse(happening.configuration);

  data.start = happening.start;
  data.end = happening.end;
  data.name = happening.name;
  data.description = happening.description;
  data.nft_ticket_address = happening.address;
  data.url_map_preview = mode.banner;

  // Fix for ALR
  data.title = data.name;

  try {
    const results = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tournament: data }),
    });

    const resultData = await results.json();

    return resultData;
  } catch (error) {
    console.log(error);
  }
};
