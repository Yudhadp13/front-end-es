import { IPlatform } from "@/types/Platform";
import { Card, Accordion, AccordionItem, Button, Chip } from "@nextui-org/react";

interface PropTypes {
  key?: string;
  platform: IPlatform;
  handleOpenLink: (url: string) => void;
}

const DetailMaterialPlatform = (props: PropTypes) => {
  const { key, platform, handleOpenLink } = props;

  return (
    <Card className="px-4 pb-4" key={key}>
      <Accordion>
        <AccordionItem
          key={platform?._id}
          aria-label={platform?.name}
          className="border-b-2 border-dashed"
          title={
            <div className="flex items-center gap-2 pb-0">
              <h2 className="text-xl font-bold text-foreground-700">
                {platform?.name}
              </h2>

              <Chip size="sm" color="primary" variant="bordered">
                Platform
              </Chip>
            </div>
          }
        >
          <p className="text-md text-foreground-600">
            {platform?.description || "Tidak ada deskripsi."}
          </p>
          
        </AccordionItem>
      </Accordion>

      <div className="mt-3 flex items-center justify-between p-2">
        <p className="text-sm text-foreground-600">
          Klik tombol untuk membuka link pemesanan.
        </p>

        <Button
          size="md"
          color="primary"
          variant="bordered"
          className="font-bold disabled:opacity-20"
          disabled={!platform?.url}
          onPress={() => platform.url && handleOpenLink(platform.url)}
        >
          Open Link
        </Button>
      </div>
    </Card>
  );
};

export default DetailMaterialPlatform;
