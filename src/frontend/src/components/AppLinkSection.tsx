import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { deploymentUrl } from '@/lib/deployConfig';

export function AppLinkSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (!deploymentUrl) return;
    
    try {
      await navigator.clipboard.writeText(deploymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <Card className="mb-6 border-primary/20 bg-card/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold mb-1 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-primary" />
              App Link
            </h3>
            {deploymentUrl ? (
              <a
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline break-all"
              >
                {deploymentUrl}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">
                No link available yet. Your app must be deployed and published first to get a shareable link.
              </p>
            )}
          </div>
          {deploymentUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  Copy link
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
